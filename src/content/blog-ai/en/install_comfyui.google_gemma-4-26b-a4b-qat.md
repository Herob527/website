
---
parentId: install_comfyui
written_by: google/gemma-4-26b-a4b-qat
---
# Installing ComfyUI on Linux

## Introduction

**ComfyUI** is a tool that allows you to connect different data processing elements together through a convenient graphical user interface (GUI).

By using "nodes," you can build complex workflows where one node might load a CSV file, another extracts text using regex, a third runs RVC training, and another generates text with HiggsTTS.

The following guide provides steps for installing ComfyUI on Linux (specifically tested on Fedora 44). These steps are based on the [ComfyUI documentation](https://docs.comfy.org/installation/system_requirements).

## Initial Requirements

Before starting, ensure you have the following installed:

*   **Python 3.12+**
*   **Git**
*   **uv**: It is highly recommended to install `uv` using [mise](https://mise.jdx.dev/) by running the command: `mise use -g uv`
*   **A terminal emulator** (such as WezTerm)

## Installation Steps

### 1. Clone the Repository

First, download the ComfyUI source code by cloning the repository:

```bash
git clone https://github.com/Comfy-Org/ComfyUI
```

### 2. Install Dependencies

Use `uv` to install the necessary packages:

```bash
uv pip install -r requirements.txt
```

**Important Hardware Note:**
The installation steps above assume you are using an **NVIDIA GPU**. If you are using an **AMD GPU** (for example, the Radeon RX 9070 used for testing), you must install the `torch` package separately using this command:

```bash
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2 --reinstall
```

### 3. Run the Server

Start the ComfyUI server with the following command:

```bash
uv run main.py
```

### 4. Access the Interface

Once the server is running, open your web browser and navigate to the default local address (port 8188):

[http://localhost:8188](http://localhost:8188)

You should now see the ComfyUI panel in your browser.

## Custom Nodes

While ComfyUI is powerful, managing models and nodes can be a bit manual, as you often need to download model files and place them into specific folders yourself. Fortunately, there are community-driven tools to make this process easier.

### Manual Installation

To install a custom node manually:
1. Navigate to the `custom_nodes` folder within your ComfyUI directory.
2. Clone the specific node's repository from GitHub.

```bash
# Ensure you are in the ComfyUI root folder
echo $(pwd) 

# Enter the custom_nodes directory and clone the repo
cd custom_nodes
git clone https://github.com/{user}/{nazwa}
```

*Note: Keep in mind that custom nodes may have their own specific dependencies listed in their README files. Occasionally, installing a new node may cause version conflicts with existing packages.*

## Recommended Custom Nodes

To simplify the management of models and nodes, the following tools are recommended:

### ComfyUI Manager
This package automates the model downloading process for you.
[View Repository](https://github.com/comfy-org/ComfyUI-Manager)

### ComfyUI Workflow Models Downloader
This package allows you to download models directly from within the user interface for each specific node. This saves you from having to visit model-hosting services like Huggingface manually.
[View Repository](https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader)  
