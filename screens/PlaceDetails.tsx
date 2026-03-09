import PlaceItem from "../components/Places/PlaceItem";
import { Place } from "../models/Place";

type PlaceDetailsProps = {
  place: Place;
};

function PlaceDetails({ place }: PlaceDetailsProps) {
  return <PlaceItem place={place} key={place.id} />;
}

export default PlaceDetails;
