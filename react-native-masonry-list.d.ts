// react-native-masonry-list.d.ts
declare module "react-native-masonry-list" {
  import { Component } from "react";
    import { StyleProp, ViewStyle } from "react-native";

  export interface MasonryListProps {
    images: Array<{
      source: { uri: string } | number;
      dimensions?: { width: number; height: number };
      header?: any;
      footer?: any;
      [key: string]: any;
    }>;
    columns?: number;
    onPressImage?: (item: any, index: number) => void;
    onLongPressImage?: (item: any, index: number) => void;
    sorted?: boolean;
    renderIndividualHeader?: (item: any) => JSX.Element | null;
    renderIndividualFooter?: (item: any) => JSX.Element | null;
    containerStyle?: StyleProp<ViewStyle>;
    imageContainerStyle?: StyleProp<ViewStyle>;
    spacing?: number;
    customImageComponent?: React.ComponentType<any>;
    completeCustomComponent?: React.ComponentType<any>;
  }

  export default class MasonryList extends Component<MasonryListProps> {}
}
