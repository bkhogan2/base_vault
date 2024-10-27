```markdown
**Caution**: Do not delete the Scripts folder. Obsidian does not display `.js` files, but they are there, and this vault depends on them. If you want to view them you can use a separate editor, like cursor.
```

## Introduction

The **Base Vault** serves as the foundational configuration repository within our vault ecosystem, providing essential plugins, themes, and scripts to enhance functionality across all vaults. Designed to be configuration-only, the Base Vault does not contain any specific folder structures, personal content, or knowledge; instead, it acts as a flexible, plug-and-play resource that downstream vaults (such as Starter and Root Vaults) can incorporate as needed.

By integrating the Base Vault as a **Git subtree** of a root vault, downstream vaults can easily inherit standardized configurations and modular components. This structure allows for centralized updates to plugins, themes, and core scripts, which can be pulled into any vault that relies on the Base Vault without disrupting unique content or personal organization.

Whether you’re creating a new **Starter Vault** template or customizing a **Root Vault** for personal use, the Base Vault’s modular approach enables consistent functionality and quick adaptability across your entire setup.

---

## Core Components and Capabilities

This **Base Vault** includes a curated selection of plugins and configurations that enhance productivity, streamline workflows, and support structured knowledge management. While many plugins provide general enhancements, the primary use cases of this vault focus on **checklists** and **seed pipelines** for organizing recurring tasks and developing ideas.

We encourage you to explore the installed plugins to see how they can support your workflow. These plugins are pre-configured to work seamlessly with custom scripts in this vault. The two primary custom functionalities are:

- **Periodic Checklists**: A custom script setup that generates date-aware linked notes on a daily, weekly, monthly, quarterly, and yearly basis. Each periodic note is automatically linked when you open a day on the calendar. Customize your own checklists

```
Open calendar in the side panel and click on any given day for demonstration. 
```

- **Pipelines**: Custom pipelines to capture, develop data through a guided progression that ends with data being assimilated into your knowledge base. This approach allows for a structured ideation process, helping you cultivate concepts from initial thoughts to fully realized ideas.

For more detailed instructions on using the Base Vault’s checklists, seed pipelines, and other unique configurations, please refer to the Usage Guide #review

**Note**: Some installed plugins may not be in use. Just be careful when removing them as in there are dependencies between plugins and custom vault scripts.

---

## Usage in Downstream Vaults
The **Base Vault** is designed to be included as a Git subtree in both **Starter** and **Root Vaults**. This integration allows starter and root vaults to inherit configurations, plugins, and scripts from the Base Vault. The subtree setup enables you to pull updates seamlessly, keeping configurations modular and ensuring downstream vaults can stay current with minimal effort.

To pull updates from the Base Vault, use the following command in your Starter or Root Vault:

```bash
git subtree pull --prefix=BaseVault <base-vault-repo-url> main --squash
```

### Version Control and Branching

The **Base Vault** can include multiple branches, each offering different configurations to support various workflows, such as development, productivity, or specialized plugin setups. These branches allow downstream vaults to adopt a configuration that best fits their needs, enabling a tailored experience while maintaining the same core functionality.

#### Possible branch configurations

Each branch in the Base Vault could provide a unique setup designed to enhance specific workflows. For example:

- **Main Branch**: Standard configuration with essential plugins and settings.
- **Development Branch**: Includes additional tools and scripts geared towards software development.
- **Productivity Branch**: Focuses on task management and checklist enhancements for high-efficiency workflows.

This would give downstream vaults the flexibility to adopt configurations based on their intended use.

#### Switching Branches in Downstream Vaults

Downstream vaults (e.g., Starter or Root Vaults) can switch to a specific branch of the Base Vault by pulling the desired branch configuration. To switch branches, use the following command in the downstream vault:

```bash
git subtree pull --prefix=BaseVault <base-vault-repo-url> <branch-name> --squash
```

Replace **branch-name** with the name of the branch you want to adopt, such as development or productivity. This setup allows you to experiment with different configurations without altering your main vault content, making it easy to switch functionalities as your workflow evolves.

**Warning**: command was generated by chatgpt and has not yet been tested. This is meant as guidance when you are switching your `base_vault` configurations in your `root_vault`

