// Type compatibility fix for VKUI with React 18
declare module '@vkontakte/vkui' {
  import { FC } from 'react';

  export const AppRoot: FC<any>;
  export const SplitLayout: FC<any>;
  export const SplitCol: FC<any>;
  export const View: FC<any>;
  export const Panel: FC<any>;
  export const PanelHeader: FC<any>;
  export const Header: FC<any>;
  export const Group: FC<any>;
  export const Cell: FC<any>;
  export const Avatar: FC<any>;
  export const Div: FC<any>;
  export const Button: FC<any>;
  export const Title: FC<any>;
  export const Text: FC<any>;
}
