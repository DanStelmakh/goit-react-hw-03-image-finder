import { ThreeCircles } from 'react-loader-spinner';

export const LoadSpinner = () => {
  return (
    <ThreeCircles
      height="100"
      width="100"
      color="#3f51b5"
      wrapperStyle={{}}
      wrapperClass="Loader"
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );
};
