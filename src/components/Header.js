import paisaIcon from '../images/paisa.svg';
import configIcon from '../images/config.svg';
import closeIcon from '../images/close.svg';
import { PAGES } from '../configs';

const Header = (props) => {
  return (
    <header>
      <img src={paisaIcon} alt="Paisa" />
      {props.pageconf.page !== PAGES.PASSWORD && (
        <div className="config-opt right">
          {props.pageconf.page === PAGES.HOME ? (
            <img
              alt="config"
              src={configIcon}
              onClick={() => props.pageconf.setPage(PAGES.CONFIG)}
            />
          ) : (
            <img
              alt="close"
              src={closeIcon}
              onClick={() => props.pageconf.setPage(PAGES.HOME)}
            />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
