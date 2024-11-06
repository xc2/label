export interface Label {
  scope: string | false;
  package: string;
  includeSubPackages: boolean;
  target: string;
}
export interface AbsoluteLabel extends Label {
  scope: string;
}

export interface ExactLabel extends Label {
  scope: string;
  includeSubPackages: false;
}
