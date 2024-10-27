module.exports = async function main(params) {
    const {
        quickAddApi: { suggester },
        app,
    } = params;

    /**
     * Configurations
     */
    const note_type = ["Task", "Idea"];
    const note_type_to_template_file = { 
        "Task": "Templates/task_template.md",
        "Idea": "Templates/idea_template.md",
    }
    const seedTemplateFilePath = "Templates/seed_template.md"; // configure later
    const seedsFolder = "database/seeds"; // configure later
    const sourceOptions = ["Seed", "New"];
    const todoPattern = /### TODO\s*---\s*([\s\S]*?)\s*---/;
    const seedTemplateFile = app.vault.getAbstractFileByPath(seedTemplateFilePath);
    // ================================

    /**
     * Prompt User - Later get user input from modal
     */

    // Prompt user to select note_type
    const selected_note_type = await suggester(note_type, note_type);
    console.log("selected_note_type: ", selected_note_type);

    // prompt user to select source
    const selected_source = await suggester(sourceOptions, sourceOptions);
    console.log("selected_source: ", selected_source);

    // prompt user to select seed file if selected_source is "Seed"
    let seedFiles = [];
    let selectedSeed = "";
    if (selected_source === "Seed") {
        seedFiles = app.vault.getFiles().filter(file => file.path.startsWith(seedsFolder)); 
        const seedFileNames = seedFiles.map(file => file.basename);
        selectedSeed = await suggester(seedFileNames, seedFileNames);
        console.log("selectedSeed: ", selectedSeed);
    }
    // ================================

    /**
     * Extract Components from Seed
     */
    // get template file
    const templateFile = app.vault.getAbstractFileByPath(note_type_to_template_file[selected_note_type]);
    console.log("templateFile: ", templateFile);

    // get seed file
    let seedFile = selected_source === "Seed" 
        ? seedFiles.find(file => file.basename === selectedSeed) 
        : seedTemplateFile;
    console.log("seedFile: ", seedFile);

    // get and strip metadata from seed file
    let seedContent = await app.vault.read(seedFile);
    const metadata = app.metadataCache.getFileCache(seedFile).frontmatter;
    seedContent = seedContent.replace(/---\n[\s\S]*?\n---\n/, '');
    console.log("metadata: ", metadata);

    // get and strip todo component from seed content
    let todoComponent = await get_component_or_default(seedContent, todoPattern, 1); 
    seedContent = seedContent.replace(todoPattern, '');
    console.log("todoComponent: ", todoComponent);
    console.log("seedContent: ", seedContent);
    // ================================

    /**
     * Transform
     */
    // get template content
    const templateContent = await app.vault.read(templateFile);

    // inject metadata into template
    // inject metadata into template
    const metadataToAdd = {
        seed: `"[[${seedFile.basename}]]"`
    };
    console.log("metadataToAdd: ", metadataToAdd);

    // Use Obsidian API to add metadata
    const frontmatter = app.metadataCache.getFileCache(templateFile).frontmatter || {};
    const updatedFrontmatter = { ...frontmatter, ...metadataToAdd };
    // Convert updated frontmatter to YAML format
    const yamlFrontmatter = '---\n' + Object.entries(updatedFrontmatter).map(([key, value]) => `${key}: ${value}`).join('\n') + '\n---\n';
    console.log("yamlFrontmatter: ", yamlFrontmatter);

    // strip frontmatter from template content using Obsidian's API
    const strippedTemplateContent = templateContent.replace(/---\n[\s\S]*?\n---\n/, '');
    console.log("strippedTemplateContent: ", strippedTemplateContent);
    
    // Prepend the updated frontmatter to the template content
    let finalTemplateContent = yamlFrontmatter + strippedTemplateContent;

    // inject todo component into template
    finalTemplateContent = finalTemplateContent.replace(
        /### TODO\s*---\s*([\s\S]*?)\s*---/,
        `### TODO\n---\n${todoComponent}\n$1---`
    );
    console.log("finalTemplateContent: ", finalTemplateContent);

    // inject seed content into template
    finalTemplateContent += "\n\n\n" + seedContent.trim();
    console.log("finalTemplateContent: ", finalTemplateContent);
    // ===============================
    
    /**
     * Load
     */

    // Write the final content back to the template file
    const newNotePath = `database/seeds/${selectedSeed}${Date.now()}.md`;
    await app.vault.create(newNotePath, finalTemplateContent);
    console.log("newNotePath: ", newNotePath);

    // ===============================

    /**
     * Functions
     */
    // get and strip todo component from seed. NOTE: index allows us to pick the correct match
    async function get_component(_seedContent, pattern, index) { // maybe take in the pattern as a parameter
        // Try to match the TODO section in the seed content
        const seedTodosMatch = _seedContent.match(pattern);
        return seedTodosMatch[index].trim();
    }

    async function get_component_or_default(_seedContent, pattern, index) {
        // Try to match the TODO section in the seed content
        const seedTodosMatch = _seedContent.match(pattern);
        
        if (seedTodosMatch) {
            return seedTodosMatch[index].trim();
        }

        // If no TODOs found, read the default seed template for TODOs
        const seedTemplateContent = await app.vault.read(seedTemplateFile);
        const defaultTodosMatch = seedTemplateContent.match(pattern);

        return defaultTodosMatch ? defaultTodosMatch[index].trim() : '';
    }
    // ================================
}
