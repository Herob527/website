
---
parentId: install_comfyui
written_by: qwen3-0.6b
---


## Installing ComfyUI Locally on Linux – Fedora 44  

### Prerequisites for Installing ComfyUI  
To use ComfyUI, you’ll need these tools installed on your system:  

- **Python 3.12+** (recommended)  
- **Git**  
- **uv** (for installing dependencies)  
- **Terminal or terminal emulator** (wezterm is a good choice)  

---

### Installation Steps  

#### 1. Clone the ComfyUI Repository  
```bash
git clone https://github.com/Comfy-Org/ComfyUI
```

---

#### 2. Install Dependencies via `uv`  
Use the following command to install required packages:  
```bash
uv pip install -r requirements.txt
```

**Important note:** If you have an **AMD GPU**, install **torch** separately using:  
```bash
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2 --reinstall
```

---

#### 3. Start the ComfyUI Server  

```bash
uv run main.py
```

---

### Launching ComfyUI Panel  

After installation, open the panel in your default browser:  
`http://localhost:8188`  

[![](https://example.com/8188.png)](http://localhost:8188)  

You’ll now be in the **ComfyUI** interface.  

---

### Custom Nodes (Optional)  

ComfyUI does not automate downloading models; you must manually place them in a folder named `custom_nodes`. You can clone your own model or use one from GitHub to install.  

```bash
cd custom_nodes
git clone https://github.com/{user}/{model-name}
```

This approach requires some effort, but it’s necessary for flexibility.  

---

### Recommended Custom Nodes  

#### ✅ **ComfyUI Manager**  
Automatically downloads models for you — no manual intervention needed.  

[https://github.com/comfy-org/ComfyUI-Manager](https://github.com/comfy-org/ComfyUI-Manager)  

#### ✅ **ComfyUI Workflow Models Downloader**  
Downloads model files directly from the UI (no need to visit external services).  

[https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader](https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader)  

---

If everything works smoothly, you can access your ComfyUI workflow in the browser.  
