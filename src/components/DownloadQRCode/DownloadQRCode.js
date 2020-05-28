import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';

class DownloadQRCode extends Component {

    downloadQR = () => {
        const canvas = document.getElementById(this.props.box.qr_code);
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QR_code_box_number_${this.props.box.qr_code}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    render() {
        return (
            <div>
                <QRCode
                    id={this.props.box.qr_code}
                    value = {`https://f0undit.herokuapp.com/#/box-detail/${this.props.box.qr_code}`}
                    size={290}
                    level={"H"}
                    includeMargin={true}
                /><br />
                <button onClick={this.downloadQR}> Download QR </button>
            </div>

        )
    }
}
const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(DownloadQRCode);