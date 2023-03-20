export type NavigationData = {
  title: string;
  icon?: React.ReactNode;
  module: string;
  children: { label: string; target: string }[];
}[];
