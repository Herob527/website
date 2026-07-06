---
title: 'ComfyUI - installation'
description: 'Instructions for installing and hosting ComfyUI locally - Linux'
date: '2026-06-29'
---

## Wstęp

**ComfyUI** is an app, that enables connecting together data processing elements via convinient GUI.

One node can load CSV, extract text using regex, run RVC training or generate text with HiggsTTS and so on inside one workflow.

There I'll provide steps to install on Linux (Fedora 44), since I was able to test on it.

Steps below are based on [ComfyUI docs](https://docs.comfy.org/installation/system_requirements).

## Initial requirements

I strongly recommend using [mise](https://mise.jdx.dev/) to install [uv](https://docs.astral.sh/uv/getting-started/installation/) by command `mise use -g uv`

- python 3.12+
- git
- uv
- terminal / terminal emulator (using wezterm btw)

## Installation

### 1. Clone repo

```bash
git clone https://github.com/Comfy-Org/ComfyUI
```

### 2. Install dependencies via uv

```bash
uv pip install -r requirements.txt
```

Important note: Installation assumes NVIDIA GPU, so if you happen to have AMD GPU, you need to install torch package separately.

Tested on Radeon RX 9070.

```bash
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm7.2 --reinstall
```

### 3. Run server

```bash
uv run main.py
```

### 4. If everything goes smoothly, open panel in browser (default port is 8188)

[http://localhost:8188](http://localhost:8188)

### 5. We are in panel

## Custom nodes

ComfyUI is not, ironically, _comfy_ when it comes to downloading models or nodes since you have to download model and put it to appropriate folder.

Luckily, there are community-driven solutions to this problem.

To install custom nodes manually, you need to go to folder `custom_nodes` and clone repo of your choice from GitHub.

```bash
echo $(pwd) # Should be ComfyUI root folder
cd custom_nodes
git clone https://github.com/{user}/{nazwa}
```

Bear in mind that custom nodes might have dependencies, that has to be installed according to readme, and sometimes there might be version clashes with existing packages.

## Recommended custom nodes

### ComfyUI Manager

This package automates downloading models for you, so you don't need to do it manually.

Link: [https://github.com/comfy-org/ComfyUI-Manager](https://github.com/comfy-org/ComfyUI-Manager)

### ComfyUI Workflow Models Downloader

This package enables downloading models from UI per node, so you don't need to visit model-hosting services like Huggingface.

Link: [https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader](https://github.com/slahiri/ComfyUI-Workflow-Models-Downloader)
