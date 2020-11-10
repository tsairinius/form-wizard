import StyledContainer from "../StyledContainer";
import "./Message.css";

const Message = ({text, onSubmit}) => {
    return (
        <StyledContainer className={"message-container"}>
            <h2 className="message-text">{text}</h2>
            <button className="primary" onClick={onSubmit}>Return to form</button>
        </StyledContainer>
    )
};

export default Message;