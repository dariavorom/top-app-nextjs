import { FunctionComponent, KeyboardEvent, useRef, useState } from 'react';
import classNames from 'classnames';

import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { UpButton } from '../components';

import { LayoutProps } from './layout.props';
import { AppContextProvider, IAppContext } from '../context/app.context';

import styles from './layout.module.css';

const Layout = ({ children }: LayoutProps) => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContent = (event: KeyboardEvent) => {
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDisplayed(false);
  };

  return (
    <div className={styles.wrapper}>
      <a
        tabIndex={0}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContent}
        className={classNames(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed,
        })}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main role='main' ref={bodyRef} tabIndex={0} className={styles.body}>
        {children}
      </main>
      <Footer className={styles.footer} />
      <UpButton />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>,
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
