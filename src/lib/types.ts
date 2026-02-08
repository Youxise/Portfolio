export type ProjectFrontmatter = {
  slug: string;
  title: string;
  stack: string[];
  tags?: string[];
  category: string; // Add category field
  cover?: string;
  gallery?: string[];
  links?: { label: string; href: string }[];
};

export type Project = ProjectFrontmatter & { body: string };

export type WindowState = {
  id: string;
  title: string;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  content?: string | React.ReactNode;
  data?: any; // This line should be present
};

export type DesktopIcon = {
  id: string;
  label: string;
  icon: string;
  type: 'folder' | 'file' | 'app';
  action: () => void;
};