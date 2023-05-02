import * as React from 'react';
//import styles from './GlobalClient.module.scss';
import { IGlobalClientProps } from './IGlobalClientProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { Layout } from './Layout';
import AppContext from '../../../context/AppContext';
import Main from "./Main"
import "../../../Main.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default class GlobalClient extends React.Component<IGlobalClientProps, {}> {
  public render(): React.ReactElement<IGlobalClientProps> {
    const {
    } = this.props;

    return (
      
      <Layout style={{overflowX:"scroll",height:"100%"}}>
        <AppContext>
          <Main/>
          </AppContext>
      </Layout>
    );
  }
}



