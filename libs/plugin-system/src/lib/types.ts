// Type for a content block
export type ContentBlock = {
    type: string;
    render: (props: any) => JSX.Element;
  };
  
  // Context provided to plugins for registration
  export type PluginContext = {
    addContentBlock: (block: ContentBlock) => void;
  };
  
  // Plugin type definition
  export type Plugin = {
    name: string;
    description: string;
    register: (context: PluginContext) => void;
  };
  