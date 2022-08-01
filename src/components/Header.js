import React from 'react';
import { Link} from 'react-router-dom';
import Panel from 'components/Panel';
import UserProfile from 'components/UserProfile';
import withRouter from 'components/withRouter';
import { useNavigate } from "react-router-dom";

const Header = props =>{
    const navigate = useNavigate();
    const toProfile = () => {
        Panel.open({
            component: UserProfile,
            props: {
                user: props.user
            },
            callback: data => {
                if (data === 'logout') {
                    navigate(0);
                }
            }
        });
    };

    return(
        <div className="header">
            <div className="grid">
                <div className="start">
                    <Link to="/">Home</Link>
                </div>
                <div className="end">
                    {props.user.nickname ? (
                        <span className="nickname" onClick={toProfile}>
                            <i className="far fa-user"></i>
                            {props.user.nickname}
                        </span>
                    ) : (
                            // <React.Fragment></React.Fragment> 可以使用简写 <></>
                        <React.Fragment>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    )

}

export default withRouter(Header);