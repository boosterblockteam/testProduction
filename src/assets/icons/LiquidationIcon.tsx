import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
  onClick?: () => void;
}

const LiquidationSVG = ({
  width = 28,
  height = 28,
  stroke = "#fff",
  fill = "none",
  className,
  onClick = () => { },
}: Props): React.ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className}
      height={height}
      width={width}
      fill={fill}
      onClick={onClick} viewBox="0 0 28 28">
      <g clipPath="url(#clip0_4059_198)">
        <path d="M14 0C6.28003 0 0 6.28003 0 14C0 21.72 6.28003 28 14 28C21.72 28 28 21.72 28 14C28 6.28003 21.72 0 14 0ZM18.3982 18.2766C17.9754 18.8929 17.4214 19.3552 16.6952 19.7004C16.1595 19.9378 15.6019 20.0836 15.0259 20.1379V22.0197C15.0259 22.3069 14.7936 22.5385 14.5071 22.5385H12.9543C12.6671 22.5385 12.4355 22.3062 12.4355 22.0197V19.9752C12.1431 19.9034 11.8551 19.803 11.5664 19.6711C10.7904 19.3545 10.1646 18.8386 9.72562 18.1447C9.28521 17.5005 9.04852 16.748 9.01188 15.8591C9.00016 15.5777 9.21487 15.3388 9.49553 15.3198L10.89 15.2245C11.1707 15.2084 11.4081 15.407 11.4411 15.681C11.4968 16.1478 11.628 16.534 11.8214 16.7978C12.039 17.1246 12.3182 17.3393 12.7403 17.5123C13.6343 17.9058 14.7716 17.9065 15.5586 17.6039C15.9075 17.4544 16.1544 17.2829 16.3178 17.0719C16.4578 16.8711 16.5267 16.66 16.5267 16.408C16.5267 16.1713 16.4658 15.9969 16.3186 15.8078C16.2416 15.7052 16.043 15.5132 15.5205 15.3044C15.2655 15.2201 14.6031 15.0318 13.5948 14.7878C12.4172 14.4939 11.7357 14.2711 11.3128 14.0418C10.6834 13.7091 10.2107 13.2943 9.91395 12.8114C9.60984 12.3197 9.45595 11.7584 9.45595 11.1443C9.45595 10.476 9.64282 9.8392 10.0107 9.2515C10.3917 8.67846 10.9538 8.22853 11.6441 7.93834C11.8749 7.83355 12.1372 7.74562 12.4362 7.67527V5.94514C12.4362 5.65789 12.6685 5.42633 12.955 5.42633H14.5078C14.7951 5.42633 15.0266 5.65862 15.0266 5.94514V7.58367C15.4934 7.66135 15.9258 7.77933 16.3178 7.93541C17.0763 8.27616 17.6266 8.73269 18.0194 9.34017C18.4129 9.91322 18.6349 10.6013 18.6737 11.3729C18.6877 11.6558 18.4722 11.8976 18.1894 11.9167L16.7619 12.0127C16.4864 12.0317 16.2497 11.8353 16.2123 11.5649C16.1324 10.9794 15.9368 10.5705 15.6136 10.3163C15.2465 10.0033 14.7137 9.85752 13.9692 9.85752C13.2401 9.85752 12.6546 9.99895 12.3197 10.2569C12.0478 10.4665 11.9203 10.7186 11.9203 11.0498C11.9203 11.3048 12.0002 11.5048 12.1578 11.6455C12.2413 11.7115 12.6971 12.0083 14.1707 12.3182C15.3879 12.6055 16.2826 12.8671 16.7729 13.0781C17.554 13.4299 18.1124 13.8835 18.44 14.4287C18.8057 14.9761 18.9896 15.5887 18.9896 16.2805C18.9896 17.0001 18.791 17.6713 18.3982 18.2766Z" fill={fill} />
      </g>
      <defs>
        <clipPath id="clip0_4059_198">
          <rect height={height}
            width={width}
            fill={fill} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LiquidationSVG;
