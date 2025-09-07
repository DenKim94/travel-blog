import styles from "@styles/components/pop-up.module.scss";

type validTypes = "info" | "warning" | "success" | "error";

export default function PopUp({ message = "", visible, type = 'info' } : { message?: string; visible: boolean; type?: validTypes }) {

    const typeStyles = {
        info: { color: "white" },
        warning: { color: "rgba(221, 140, 0, 1)" },
        success: { color: "rgba(74, 236, 74, 1)" },
        error: { color: "rgba(255, 23, 23, 1)" },
    };

    const popupStyle = {
        ...typeStyles[type],
      };

    return (
        <div className={`${styles.popup} ${visible ? styles.show : styles.hide}`} data-testid="pop-up" style={popupStyle}>
            {message}
        </div>
    );
};
