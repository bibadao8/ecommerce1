import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { Button } from "antd";

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, ...rest }) => {
    return (
        <Button
            size={size}
            style={styleButton}
            //icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
}

export default ButtonComponent;