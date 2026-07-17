/cli

/overview

# CLI Introduction

## Overview

The NitroStack CLI is a powerful command-line tool for creating, developing, and building MCP servers with v3.0's decorator-based architecture.

## Features

- **Quick Initialization** \- Create new projects in seconds
- **Hot Reload** \- Development mode with automatic reloading
- 🎨 **Studio Integration** \- Visual testing environment
- 🔨 **Code Generation** \- Generate modules, tools, types, and more
- 📦 **Production Builds** \- Optimize for deployment
- 🎯 **Templates** \- Pre-built templates (basic, typescript-auth)

## Commands

| Command | Description |
| --- | --- |
| `init` | Create a new NitroStack project |
| `dev` | Start development server with Studio |
| `build` | Build project for production |
| `generate` | Generate code (types, modules, tools, etc.) |

## Installation

### Global Installation

Bash

```bash
npm install -g @nitrostack/cli
```

Verify installation:

Bash

```bash
nitrostack-cli --version
```

### Using npx

No installation required:

Bash

```bash
npx @nitrostack/cli init my-project
```

## Quick Start

Bash

```bash
# Create a new project
nitrostack-cli init my-server --template typescript-auth

# Navigate to project
cd my-server

# Install dependencies
npm install

# Start development
nitrostack-cli dev
```

Studio opens at `http://localhost:3000` automatically!

## Command Reference

### nitrostack-cli init

Create a new NitroStack project.

Bash

```bash
nitrostack-cli init <project-name> [options]
```

**Options**:

- `--template <name>` \- Template to use (typescript, typescript-auth)

**Example**:

Bash

```bash
nitrostack-cli init ecommerce --template typescript-auth
```

### nitrostack-cli dev

Start development server with hot reload and Studio.

Bash

```bash
nitrostack-cli dev [options]
```

**Options**:

- `--port <number>` \- Studio port (default: 3000)

**Example**:

Bash

```bash
nitrostack-cli dev --port 8080
```

### nitrostack-cli build

Build project for production.

Bash

```bash
nitrostack-cli build
```

Outputs to `dist/` directory.

### nitrostack-cli generate

Generate code from templates.

Bash

```bash
nitrostack-cli generate <type> [name] [options]
```

**Types**:

- `types` \- Generate TypeScript types from tools
- `module` \- Generate a new module
- `tool` \- Generate a tool definition
- `resource` \- Generate a resource definition
- `prompt` \- Generate a prompt definition
- `guard` \- Generate an authentication guard
- `middleware` \- Generate middleware
- `interceptor` \- Generate an interceptor
- `pipe` \- Generate a pipe
- `filter` \- Generate an exception filter
- `service` \- Generate a service

**Examples**:

Bash

```bash
# Generate types
nitrostack-cli generate types

# Generate module
nitrostack-cli generate module payments

# Generate tool
nitrostack-cli generate tool create-payment --module payments

# Generate guard
nitrostack-cli generate guard admin
```

## Configuration

CLI behavior can be configured via:

1. **Command-line flags** \- Highest priority
2. **Environment variables** \- Medium priority
3. **Config file** \- Lowest priority

### Environment Variables

Bash

```bash
# .env
NITROSTACK_PORT=3000
NITROSTACK_WIDGET_PORT=3001
```

### Config File

Create `nitrostack.config.js`:

Javascript

```javascript
export default {
  dev: {
    port: 3000,
    widgetPort: 3001,
    openBrowser: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
};
```

## Development Workflow

1. **Initialize** \- Create project with `init`
2. **Develop** \- Use `dev` for hot reload + Studio
3. **Generate** \- Add features with `generate`
4. **Test** \- Test in Studio with AI chat
5. **Build** \- Production build with `build`
6. **Deploy** \- Deploy `dist/` to server

## Best Practices

### 1\. Use Templates

Start with a template for best practices:

Bash

```bash
nitrostack-cli init my-project --template typescript-auth
```

### 2\. Generate Code

Use generators instead of manual coding:

Bash

```bash
nitrostack-cli generate module users
nitrostack-cli generate tool get-user --module users
```

### 3\. Type Generation

Regenerate types after tool changes:

Bash

```bash
nitrostack-cli generate types
```

### 4\. Test in Studio

Always test in Studio before deployment:

Bash

```bash
nitrostack-cli dev
# Test with AI chat
# Test manual execution
```

## Troubleshooting

### Command Not Found

Bash

```bash
# If installed globally
npm install -g nitrostack

# Or use npx
npx nitrostack --version
```

### Port Already in Use

Bash

```bash
# Use different port
nitrostack-cli dev --port 8080
```

### Permission Errors

Bash

```bash
# Fix npm permissions
sudo chown -R $USER /usr/local/lib/node_modules
```

## Next Steps

- [Installation Guide](https://docs.nitrostack.ai/cli/installation)
- [Init Command](https://docs.nitrostack.ai/cli/init)
- [Dev Command](https://docs.nitrostack.ai/cli/dev)
- [Generate Command](https://docs.nitrostack.ai/cli/generate)

* * *

**CLI Version**: 3.0.0

[Previous\\
\\
🚦 Rate Limiting](https://docs.nitrostack.ai/sdk/typescript/rate-limiting) [Next\\
\\
🎨 Studio](https://docs.nitrostack.ai/studio/overview)

[Documentation Home](https://docs.nitrostack.ai/)• [View All Docs](https://docs.nitrostack.ai/documentation-index)• [GitHub](https://github.com/nitrocloudofficial/nitrostack)