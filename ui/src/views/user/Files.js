import React, {Component} from 'react';
import {getUserFiles, postUserFile} from './../../Api';
import Dropzone from 'react-dropzone'
import {connectedComponent} from './../../util/redux-utils';
import {selectFiles, selectFileUploading} from './../../rootSelectors';
import {formatISO9075, parseISO} from 'date-fns'

class Files extends Component {

  componentDidMount() {
    this.props.getUserFiles();
  }

  formatTimestamp = (timestamp) => {
    const date = parseISO(timestamp);
    return formatISO9075(date);
  };

  handleOnDrop = async (files) => {
    if (files.length === 0) return;
    const response = await this.props.postUserFile(files);
    this.props.getUserFiles();
  };

  handleClickDownload = (userFileId) => {
    //window.open('/api/user/file/' + userFileId, '_blank')
  };

  renderFileRow = (row) => {
    return (
      <tr key={row.userFileId}>
        <td>{row.name}</td>
        <td>{this.formatTimestamp(row.createdAt)}</td>
        <td>{row.mediaType}</td>
        <td style={{whiteSpace: 'nowrap'}}>
          <button type="button" className="btn btn-success btn-sm" onClick={() => this.handleClickDownload(row.userFileId)}>
            <i className="fa fa-download"/>
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger btn-sm">
            <i className="fa fa-trash"/>
          </button>
        </td>
      </tr>
    );
  };

  renderUploadCard = () => {
    if (this.props.fileUploading) {
      return (
        <i className="fas fa-sync fa-spin fa-3x"/>
      );
    }

    return (
      <Dropzone onDrop={this.handleOnDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()} style={{cursor: 'pointer'}}>
              <input {...getInputProps()} />
              <i className="fas fa-file-upload fa-10x"/>
              <br/>
              <br/>
              <h5>
                Lohista oma failid siia või vajuta ikoonile
              </h5>
            </div>
          </section>
        )}
      </Dropzone>
    );
  };

  render() {
    return (
      <div className={'container'}>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Minu failid
              </div>
              <div className="card-body">
                <table className="table table-hover table-sm">
                  <thead>
                  <tr>
                    <th scope="col">Faili nimi</th>
                    <th scope="col">Loodud</th>
                    <th scope="col">Tüüp</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.props.files.map(row => this.renderFileRow(row))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Lisa uus fail
              </div>
              <div className="card-body text-center">
                {this.renderUploadCard()}
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }

}

const mapStateToProps = state => ({
  files: selectFiles()(state),
  fileUploading: selectFileUploading()(state)
});

const mapDispatchToProps = {getUserFiles, postUserFile};

export default connectedComponent(Files, mapStateToProps, mapDispatchToProps);
