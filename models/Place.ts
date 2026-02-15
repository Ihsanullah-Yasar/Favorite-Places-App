    import { ILocation,IPlaceData,ICreatePlaceDTO } from "../types/place";

   

    export class Place{
        public readonly id: string;
        public readonly title: string;
        public readonly imageUrl: string;
        public readonly address: string;
        public readonly location: Readonly<ILocation>
        
        constructor(title: string,imageUrl: string,address: string,location: ILocation){
            this.ValidateInput(title,imageUrl,address,location);

            this.title=this.sanitizeString(title);
            this.imageUrl=this.normalizeUrl(imageUrl);
            this.address= this.sanitizeString(address);
            this.location=Object.freeze({ ...location});  //immutable   
            this.id= this.generateId();
        }

        // validate construct inputs
        private ValidateInput(title: string,imageUrl: string, address: string, location: ILocation): void{
            if(!title?.trim()){
                throw new Error("Title is required.")
            }

            if(!imageUrl?.trim()){
                throw new Error("Image Url is required.")
            }

            if(!address?.trim()){
                throw new Error("Address is required.")
            }

            if(!location || typeof location.lat !== 'number' || typeof location.lng !== 'number'){
                throw new Error("Valid location with lat and lng coordinates is required.")
            }

            // Validate latitude range (-90 to 90)
            if (location.lat < -90 || location.lat > 90) {
                throw new Error("Latitude must be between -90 and 90 degrees.");
            }
            
            // Validate longitude range (-180 to 180)
            if (location.lng < -180 || location.lng > 180) {
                throw new Error("Longitude must be between -180 and 180 degrees.");
            }
            
            if (location.alt !== undefined && typeof location.alt !== 'number') {
                throw new Error('Altitude must be a number if provided');
            }
        }

        /**
         * Sanitizes and trims string inputs
         */
        private sanitizeString(value: string): string {
            return value.trim().replace(/\s+/g, ' ');
        }

        private normalizeUrl(url: string): string {
        try {
        const normalizedUrl = url.trim();
        const parsedUrl = new URL(normalizedUrl);
        
        // Additional URL validation
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
            throw new Error('URL must use HTTP or HTTPS protocol');
        }
        
        return normalizedUrl;
        } catch (error) {
        throw new ValidationError('Invalid image URL format', [error instanceof Error ? error.message : 'Unknown error']);
        }
    }

        private generateId(): string{
            const timestamp= new Date();
            const random= Math.random().toString(36).substring(2,15);
            return `${timestamp}-${random}`;
        }

        public getFormattedAddress(): string{
            return this.address;
        }

        public getCoordinates(): [number, number]{
            return [this.location.lat,this.location.lng];
        }

        public hasAltitude(): boolean{
            return this.location.alt !== undefined;
        }

        public getAltitude(): number | undefined {
            return this.location.alt;
        }

    // Static factory method to create a Place from a plain object
    public static fromJSON(data: {
        title: string;
        imageUrl: string;
        address: string;
        location: ILocation;
    }): Place {
        return new Place(
        data.title,
        data.imageUrl,
        data.address,
        data.location
        );
    }
}


/**
 * Custom validation error class
 */
export class ValidationError extends Error {
  public readonly errors: string[];

  constructor(message: string, errors: string[] = []) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}