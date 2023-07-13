import React, {useState} from 'react';
import "./style.css";

//Utils
import { useNavigate } from "react-router-dom";
import {setUserSettings, toLogin} from "../../api";
import {setUserSession} from "../../utils/localStorage";

const Login = () => {

  const navigate = useNavigate();

  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [correctLogin, setCorrectLogin] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginData = await toLogin(idInstance.toLowerCase(), apiTokenInstance.toLowerCase());
      if (loginData) {
        setUserSession(apiTokenInstance.toLowerCase(), idInstance.toLowerCase());
        setCorrectLogin(true);

        await setUserSettings(idInstance.toLowerCase(), apiTokenInstance.toLowerCase(),{
          webhookUrl: "",
          webhookUrlToken: "",
          delaySendMessagesMilliseconds: 3000,
          markIncomingMessagesReaded: "no",
          markIncomingMessagesReadedOnReply: "yes",
          outgoingWebhook: "yes",
          outgoingMessageWebhook: "yes",
          outgoingAPIMessageWebhook: "yes",
          incomingWebhook: "yes",
          stateWebhook: "yes",
          deviceWebhook: "no",
          keepOnlineStatus: "no",
        })

        navigate("/user");
      } else {
        setCorrectLogin(false);
      }

    } catch (error) {
      navigate("*");
    }
  }

  return (
      <div className="login">
        <h2>Log in with GREEN-API keys</h2>
        <form
            className="login__form"
            onSubmit={handleSubmit}
            method="post">
          <label className="login__inputs-label">
            Enter IdInstance:
            <input
                className="login__input"
                type="text"
                name="IdInstance"
                required
                autoComplete="off"
                tabIndex={0}
                onChange={e => setIdInstance(e.target.value)}
                value={idInstance}
            />
          </label>
          <label className="login__inputs-label">
            Enter apiTokenInstance:
            <input
                className="login__input"
                type="password"
                name="apiTokenInstance"
                required
                autoComplete="new-password"
                tabIndex={0}
                onChange={e => setApiTokenInstance(e.target.value)}
                value={apiTokenInstance}
            />
          </label>

          <p className="login__highlighted">If you don't want to register in GREEN-API, visit <a href="https://github.com/Diamata/green-api-chat/blob/master/README.md" target="_blank" rel="noreferrer"><b>GitHub</b></a> to watch the video about this app</p>

          <button type="submit" className="login__submit">Log in</button>

          {!correctLogin && <p className="login__incorrect">Incorrect login or password</p>}

        </form>
        <p className="login__tip">Visit and register in <a href="https://green-api.com/" target="_blank" rel="noreferrer">GREEN-API</a> to get the IdInstance and apiTokenInstance</p>
      </div>
  );
};

export default Login;
