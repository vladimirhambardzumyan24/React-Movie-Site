import PropTypes from "prop-types";

export default function FilmInfo({ filmInfo }) {
  return (
    <>
      <div>{JSON.stringify(filmInfo)}</div>
    </>
  );
}

FilmInfo.propTypes = {
  filmInfo: PropTypes.object,
};
