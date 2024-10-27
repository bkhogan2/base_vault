module.exports = async function syncSeeds() {
    // Define the Kanban board path
    const kanbanFilePath = "_views/pipelines/seed_pipeline.md";
    const seedFolder = "database/seeds"; 

    // Get the file object of the Kanban board
    const kanbanFile = app.vault.getAbstractFileByPath(kanbanFilePath);

    // Read the content of the Kanban board file
    const kanbanContent = await app.vault.read(kanbanFile);

    // Fetch all seed notes from the "database/seeds" folder 
    const seedNotes = await app.vault.getFiles().filter(file => file.path.startsWith(seedFolder));


    // Prepare new tasks based on seed note titles 
    let newTasks = ""; 
    for (const seed of seedNotes) { 
        const seedTitle = seed.basename; 
        // Check if the task already exists in the Kanban content 
        if (!kanbanContent.includes(`[[${seedTitle}]]`)) { 
            // If it doesn't exist, add the task
            newTasks += `- [ ] [[${seedTitle}]]`;
        }
}

newTasks = newTasks.trim() + "\n";
console.log(newTasks);

// Add the new task to the "Captured" section
// Using regex to insert after the ## Captured section
const updatedContent = kanbanContent.replace(/(## captured\n)/, `$1${newTasks}`);
await app.vault.modify(kanbanFile, updatedContent);
}

