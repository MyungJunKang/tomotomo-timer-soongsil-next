import styles from "./Header.module.scss";
import cn from "classnames";

const Header = () => {
  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.titleBox, "fw-600 fs-24 flexAlignCenter")}>
        Tomotomo
      </div>
    </div>
  );
};

export default Header;
