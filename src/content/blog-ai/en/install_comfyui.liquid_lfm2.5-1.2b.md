
---
parentId: install_comfyui
written_by: liquid/lfm2.5-1.2b
---
### What is ComfyUI?

ComfyUI is a tool that helps connect different data processing parts through a user-friendly graphical interface. It allows you to perform tasks like reading CSV files, extracting text using regular expressions, running machine learning training, or generating text with specific tools all within one workflow.

This guide will walk you through installing and setting up ComfyUI on Linux, specifically for Fedora 44. I’ll explain each step clearly so you can follow along easily.

---

### What You Need Before Starting

Before you begin, make sure you have the following installed:

- Python 3.12 or higher
- Git
- The `uv` package (a tool for managing models)
- Terminal or a terminal emulator (like WeizTerm)

If you're using an AMD GPU instead of an NVIDIA one, you may need to install additional packages separately.

---

### Step-by-Step Installation Guide

#### 1. Clone the ComfyUI Repository

Open your terminal and run the following command:

```bash
git clone https://github.com/Comfy-Org/ComfyUI
```

This creates a copy of the ComfyUI project in your current directory.

---

#### 2. Install Dependencies Using `uv`

Next, install the required dependencies using the `uv` package:

```bash
uv pip install -r requirements.txt
```

This command will download and install all the necessary packages listed in the `requirements.txt` file.

---

#### 3. Install NVIDIA GPU-Specific Packages (Optional)

If you're using an NVIDIA GPU, you might need to install additional packages:

```bash
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2 --reinstall
```

This ensures compatibility with your graphics card.

---

#### 4. Start the ComfyUI Server

Once everything is installed, run the server:

```bash
uv run main.py
```

This starts the ComfyUI application on your default port (8188).

---

#### 5. Access ComfyUI in Your Browser

Open a web browser and go to:

[http://localhost:8188](http://localhost:8188)

You should see the ComfyUI interface ready for use.

---

### Custom Nodes and Models

ComfyUI doesn’t automatically download models or nodes. You’ll need to install them manually if you want custom features.

#### Install a Custom Node (Example)

To install a custom node, go to the `custom_nodes` folder and clone a repo from GitHub:

```bash
echo $(pwd) # Should be ComfyUI root folder
cd custom_nodes
git clone https://github.com/{user}/{nazwa}
```

Make sure to check the README for any dependencies or version conflicts.

---

### Recommended Custom Nodes

- **ComfyUI Manager**: Automates downloading models.
  - [Link](https://github.com/comfy-org/ComfyUI-Manager)
  
- **ComfyUI Workflow Models Downloader**: Downloads models directly from the UI per node.
  - [Link](https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader)

---

By following these steps, you’ll have a fully functional ComfyUI environment ready for your data processing needs. If you encounter any issues, check the documentation or community forums for help.  
