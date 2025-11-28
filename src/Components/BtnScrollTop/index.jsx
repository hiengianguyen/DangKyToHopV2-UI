import style from "./BtnSrcollTop.module.scss";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

function BtnSrcollTop() {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 200);
  };

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);

    return () => {
      window.removeEventListener("scroll", handleVisibleButton);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showGoTop && (
          <motion.div
            key="box"
            className={cx("wrapper", "shadow")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            onClick={handleScrollUp}
            title="Trượt lên"
          >
            <FontAwesomeIcon icon={faArrowUp} className="" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default BtnSrcollTop;
