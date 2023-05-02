import { getTheme } from "office-ui-fabric-react";
import styled from "styled-components";

export const theme = getTheme();
export const fluentUIStyleOverride = styled.div`
  .ms-Button {
    height: 30px;
  } 
  h3 {
    margin: 10px 0;
    font-weight: 600;
  }
  h4, h5 {
    margin: 5px 0;
    font-weight: 600;
  }
`;

export const Layout = styled(fluentUIStyleOverride)`
/**
To hide sharepoint edit/expand/sidebar
 */
  position: fixed;
    left: 0px;
    right: 0;
    top: 48px;
    bottom:0;
    width: 100vw;
    z-index: 11;
    transition: all 0.3s ease;

  &.fullScreen {
    background-color: ${theme.palette.white};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    transition: all 0.3s ease;
  }
`;
