export type Plugin = {
  name: string;
  description: string;
  register: (context: PluginContext) => void;
};

export type PluginContext = {
  addContentBlock: (block: ContentBlock) => void;
};

export type ContentBlock = {
  type: string;
  render: (props: any) => JSX.Element;
};

class PluginSystem {
  private contentBlocks: ContentBlock[] = [];

  registerPlugin(plugin: Plugin) {
    plugin.register({
      addContentBlock: this.addContentBlock.bind(this),
    });
  }

  addContentBlock(block: ContentBlock) {
    this.contentBlocks.push(block);
  }

  getContentBlocks() {
    return this.contentBlocks;
  }
}

export const pluginSystem = new PluginSystem();
