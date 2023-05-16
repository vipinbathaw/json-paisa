import paisaIcon from '../images/paisa.svg';
import { ReactComponent as ConfigIcon } from '../images/config.svg';
import { ReactComponent as CloseIcon } from '../images/close.svg';
import { ReactComponent as ReportIcon } from '../images/reports.svg';
import { PAGES } from '../configs';

const Header = (props) => {
  let showReportsIcon = false;
  let showConfigIcon = false;
  let showCloseIcon = false;

  if (
    ![PAGES.PASSWORD, PAGES.CONFIG, PAGES.REPORTS].includes(props.pageconf.page)
  ) {
    showReportsIcon = true;
  }

  if (![PAGES.PASSWORD, PAGES.CONFIG].includes(props.pageconf.page)) {
    showConfigIcon = true;
  }

  if (props.pageconf.page === PAGES.CONFIG) {
    showCloseIcon = true;
  }

  return (
    <header>
      <img
        src={paisaIcon}
        onClick={() => props.pageconf.setPage(PAGES.HOME)}
        alt="Paisa"
      />
      <div className="right row row-v-center">
        <div className={showReportsIcon ? 'menu-item' : 'gone'}>
          <ReportIcon onClick={() => props.pageconf.setPage(PAGES.REPORTS)} />
        </div>
        <div className={showConfigIcon ? 'menu-item' : 'gone'}>
          <ConfigIcon onClick={() => props.pageconf.setPage(PAGES.CONFIG)} />
        </div>
        <div className={showCloseIcon ? 'menu-item' : 'gone'}>
          <CloseIcon onClick={() => props.pageconf.setPage(PAGES.HOME)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
