export interface Node {
  entry: NodeEntry;
}

export interface NodeEntry {
  id: string;
  name: string;
  nodeType: string;
  isFolder: boolean;
  isFile: boolean;
  isLocked: boolean;
  modifiedAt: string;
}
