export type NavigationData = {
  //用于展示的文字
  title: string;
  //title前的icon
  icon?: React.ReactNode;
  //路由前缀
  module: string;
  //to next/link, label for children，target for href
  children: { label: string; target: string }[];
}[];
