export type CapabilityName =
  | 'filesystem.read'
  | 'filesystem.write'
  | 'filesystem.list'
  | 'process.execute'
  | 'process.inspect'
  | 'browser.navigate'
  | 'screen.observe'
  | 'clipboard.read'
  | 'clipboard.write'
  | 'system.info';

export interface CapabilityPermission {
  capability: CapabilityName;
  granted: boolean;
  resourceConstraints?: {
    allowedPaths?: string[];
    allowedCommands?: string[];
    maxTimeoutMs?: number;
  };
}

export interface CapabilityContract {
  name: CapabilityName;
  description: string;
  parametersSchema: Record<string, unknown>;
  requiresSandbox: boolean;
}
