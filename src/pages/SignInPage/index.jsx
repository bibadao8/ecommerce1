import React from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight,WrapperTextBlack } from "../../components/InPutForm/StyledSignin.js";
import InputForm from "../../components/InPutForm/InPutFrom.js";
import ButtonComponent from "../../components/Button/Button.jsx";
import imageLogo from "../../assest/image.png";
import { Image } from "antd";

const SignInPage = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ccc', height: '100vh' }}>
            <div style={{ width: '800px', height: '545px', borderRadius: '60px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h4> Xin chào</h4>
                    <p> Đăng nhập và tạo tài khoản </p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" />
                    <InputForm placeholder="password" />
                    <ButtonComponent
                        bordered={false}
                        size={40}
                        styleButton={{
                            background: 'rgb(255,57,69)',
                            height: '48px',
                            width: '100%',
                            border: 'none',
                            borderRadius: '4px',
                            margin: "15px 0 10px" // giảm khoảng cách margin-top
                        }}
                        textButton={"Đăng nhập"}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    />
                    <p style={{ marginTop: '10px', marginBottom: '5px' }}>
                        <WrapperTextLight> Quên mật khẩu? </WrapperTextLight>
                    </p>
                    <p style={{ marginTop: '0px' }}>
                    <WrapperTextLight>
                            <WrapperTextBlack>Bạn chưa có tài khoản?</WrapperTextBlack> Đăng ký
                        </WrapperTextLight>
                    </p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
                </WrapperContainerRight>
            </div>
        </div>
    );
}

export default SignInPage;
