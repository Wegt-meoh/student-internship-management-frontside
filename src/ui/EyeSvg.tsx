export default function EyeSvg({ open }: { open: boolean }) {
  return (
    <>
      {open ? (
        <svg
          color="#999"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.001 20.717c5.343 0 8.282-3.087 9.674-5.294a5.88 5.88 0 0 0 .392-5.525C20.919 7.293 18.107 3.283 12 3.283c-6.103 0-8.916 4.005-10.066 6.61l1.372.606-1.372-.606a5.882 5.882 0 0 0 .392 5.534c1.395 2.207 4.334 5.29 9.674 5.29Zm-8.406-6.091a4.382 4.382 0 0 1-.288-4.127c1.025-2.322 3.425-5.716 8.694-5.716 5.272 0 7.67 3.398 8.693 5.72a4.38 4.38 0 0 1-.288 4.12c-1.224 1.94-3.75 4.594-8.405 4.594-4.653 0-7.18-2.65-8.406-4.591ZM9.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          color="#999"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.517 4.474c1.206-.453 2.608-.724 4.234-.724 6.036 0 8.834 3.715 9.985 6.161a5.255 5.255 0 0 1-.393 5.219 11.207 11.207 0 0 1-3.027 3.036.75.75 0 1 1-.835-1.245c.058-.04.115-.078.171-.118a9.704 9.704 0 0 0 2.447-2.511 3.755 3.755 0 0 0 .28-3.742c-1.003-2.131-3.374-5.3-8.628-5.3-1.456 0-2.679.242-3.706.628a.75.75 0 1 1-.528-1.404ZM5.498 6.382a.75.75 0 0 1-.07 1.059c-1.126.987-1.854 2.148-2.306 3.105a3.756 3.756 0 0 0 .281 3.749c1.206 1.787 3.71 4.26 8.348 4.26 1.237 0 2.315-.175 3.253-.462a.75.75 0 1 1 .438 1.435c-1.084.33-2.31.527-3.69.527-5.28 0-8.198-2.855-9.592-4.921a5.256 5.256 0 0 1-.394-5.228c.513-1.09 1.353-2.435 2.674-3.593a.75.75 0 0 1 1.058.07Z"
            clipRule="evenodd"
          ></path>
          <path
            fillRule="evenodd"
            d="M20.048 20.012a.75.75 0 0 1-1.06.036l-15.5-14.5a.75.75 0 0 1 1.025-1.096l15.5 14.5a.75.75 0 0 1 .035 1.06Z"
            clipRule="evenodd"
          ></path>
          <path
            fillRule="evenodd"
            d="M9.559 11.535c-.203 1.067.554 2.164 1.808 2.374a2.36 2.36 0 0 0 1.707-.36.75.75 0 0 1 1.043.191.75.75 0 0 1-.215 1.04 3.893 3.893 0 0 1-2.816.602c-1.984-.331-3.381-2.13-3.007-4.094.06-.311.16-.607.297-.881a.768.768 0 0 1 1.01-.358.733.733 0 0 1 .338.995 1.908 1.908 0 0 0-.165.491Zm1.219-2.362a.769.769 0 0 1 .716-.797c.302-.02.61-.007.92.045 1.784.299 3.086 1.775 3.066 3.501a.77.77 0 0 1-.762.754.73.73 0 0 1-.744-.74c.011-.948-.72-1.854-1.842-2.041a2.427 2.427 0 0 0-.566-.028.732.732 0 0 1-.788-.694Z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </>
  );
}
