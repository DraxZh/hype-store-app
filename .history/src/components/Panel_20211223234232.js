import React from 'react';
import {render} from 'react-dom';

class Panel extends React.Component{
    state={
        active: false,
        component: null,
        callback: ()=>{}
    };
    open = (options)=>{
        const { component, callback } = options;
        const newKey = new Date().getTime();
        const newComponent = React.createElement(component, {...props,close: this.close, key:newKey});
        this.setState({
            active: true,
            component: newComponent,
            callback: callback
        })
    };
    close=data=>{
        this.setState({
            active: false
        });
        this.state.callback(data);
    };
    
    render(){
        const panelClass = {
            true:'panel-wrapper active',
            false:'panel-wrapper',
        };
        
        return(
            <div className={panelClass[this.state.active]}>
                <div className="over-layer" onClick={()=>{this.close()}}></div>
                    {/*这是一个遮罩层 */}
                <div className="panel" >
                    <div className="head">
                        <span className="close" onClick={()=>{this.close()}}>x</span>
                        {this.state.component}
                    </div>
                </div>
            </div>
        )
    };
}

const _div = document.createElement('div')
document.body.appendChild(_div)
const _panel = render(<Panel/>,_div)
export default _panel;