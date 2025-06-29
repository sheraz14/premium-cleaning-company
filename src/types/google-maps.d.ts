declare namespace google.maps {
  interface LatLng {
    lat(): number;
    lng(): number;
  }

  interface Geometry {
    location: LatLng;
  }

  interface PlaceResult {
    formatted_address?: string;
    geometry?: Geometry;
    address_components?: AddressComponent[];
  }

  interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  interface AutocompletePrediction {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  }

  interface AutocompleteService {
    getPlacePredictions(
      request: AutocompletionRequest,
      callback: (predictions: AutocompletePrediction[], status: string) => void
    ): void;
  }

  interface AutocompletionRequest {
    input: string;
    types?: string[];
    componentRestrictions?: {
      country: string | string[];
    };
  }

  interface MapsEventListener {
    remove(): void;
  }

  namespace places {
    class Autocomplete {
      constructor(
        inputField: HTMLInputElement,
        opts?: AutocompleteOptions
      );
      addListener(eventName: string, handler: Function): MapsEventListener;
      getPlace(): PlaceResult;
    }

    interface AutocompleteOptions {
      types?: string[];
      componentRestrictions?: {
        country: string | string[];
      };
      fields?: string[];
    }
  }
} 