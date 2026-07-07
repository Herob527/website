
---
parentId: install_comfyui
written_by: openai/gpt-oss-20b
---
## Wstęp

**ComfyUI** is a graphical application that lets you connect different data‑processing steps together in one workflow.  
You can load a CSV file, extract text using regex, train RVC models, or generate speech with HiggsTTS—all inside the same interface.

Below are simple instructions to install and run ComfyUI on Linux (Fedora 44). The steps follow the official [ComfyUI documentation](https://docs.comfy.org/installation/system_requirements).

## Prerequisites

Before starting, make sure you have the following tools installed:

- **Python 3.12 or newer**
- **Git** – for cloning repositories
- **UV** – a fast Python dependency manager  
  You can install it with `mise` by running:  
  ```bash
  mise use -g uv
  ```
- A terminal emulator (I used *wezterm*, but any will work)

If you plan to use GPU acceleration, ComfyUI assumes an NVIDIA card. If you have an AMD GPU, you’ll need a special installation step later.

## Installation Steps

### 1. Clone the repository

Open your terminal and run:

```bash
git clone https://github.com/Comfy-Org/ComfyUI
```

This downloads the ComfyUI source code to a folder named `ComfyUI`.

### 2. Install dependencies with UV

Navigate into the cloned folder and install all required Python packages:

```bash
uv pip install -r requirements.txt
```

> **Note:**  
> If you have an AMD GPU, the default PyTorch package won’t work. Instead, run this command to install a version compatible with ROCm (tested on Radeon RX 9070):

```bash
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2 --reinstall
```

### 3. Start the server

Launch ComfyUI’s backend by executing:

```bash
uv run main.py
```

The server will start and listen on port **8188**.

### 4. Open the UI in your browser

Navigate to:

[http://localhost:8188](http://localhost:8188)

You should see the ComfyUI panel, ready for you to create workflows.

## Adding Custom Nodes

ComfyUI does not automatically download models or nodes; you need to add them yourself.  
A convenient way is to clone node repositories into the `custom_nodes` folder inside the main project directory.

1. Verify your current location:

   ```bash
   echo $(pwd)  # Should show the ComfyUI root folder
   ```

2. Go to the custom nodes directory and clone a node repository of your choice:

   ```bash
   cd custom_nodes
   git clone https://github.com/{user}/{node-name}
   ```

> **Tip:**  
> Some custom nodes may require additional dependencies. Check their README for installation instructions. Also, be aware that package versions might conflict with the ones already installed.

## Recommended Custom Nodes

### ComfyUI Manager

This tool automates downloading models so you don’t have to do it manually.

- Repository: [https://github.com/comfy-org/ComfyUI-Manager](https://github.com/comfy-org/ComfyUI-Manager)

### ComfyUI Workflow Models Downloader

Allows you to download models directly from the UI, eliminating the need to visit external hosting services like Hugging Face.

- Repository: [https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader](https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader)  
