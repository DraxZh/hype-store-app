import { useNavigate } from "react-router-dom";
export default function withRouter(Component){
    const Wrapper = (props) => {
        const history = useNavigate();
        return <Component history={history} {...props} />;
    };
    return Wrapper;
};