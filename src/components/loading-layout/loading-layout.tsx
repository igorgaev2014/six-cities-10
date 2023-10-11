import {Oval} from 'react-loader-spinner';

function LoadingLayout() {
  return (
    <div
      className="spinner"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <Oval color="#00BFFF" height={250} width={250} />
    </div>
  );
}

export default LoadingLayout;

