
import texts from "../../helpers/texts";
import styles from "./ImgText.module.css";

const ImgText = ({texts}) => {
    return (
        <div className={styles.container}>

            <p>
                {texts}
            </p>
        </div>
    );
};

export default ImgText;
