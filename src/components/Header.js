import paisaIcon from '../images/paisa.svg';
import configIcon from '../images/config.svg';
import closeIcon from '../images/close.svg';
import { PAGES } from '../configs';

const Header = (props) => {
  return (
    <header>
      <img src={paisaIcon} alt="Paisa" />
      <div className="config-opt right">
        {props.pageconf.page === PAGES.HOME ? (
          <img
            src={configIcon}
            onClick={() => props.pageconf.setPage(PAGES.CONFIG)}
          />
        ) : (
          <img
            src={closeIcon}
            onClick={() => props.pageconf.setPage(PAGES.HOME)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
