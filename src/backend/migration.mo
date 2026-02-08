import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";

module {
  type ProductCategory = {
    #eotCranes;
    #billetShearingMachines;
    #scrapShredders;
  };

  type Product = {
    id : Text;
    name : Text;
    category : ProductCategory;
    description : Text;
    specifications : Text;
    applications : Text;
    images : [Storage.ExternalBlob];
  };

  type Industry = {
    id : Text;
    name : Text;
    description : Text;
  };

  type CompanyInfo = {
    name : Text;
    address : Text;
    phone : Text;
    email : Text;
    businessHours : Text;
    missionStatement : Text;
    history : Text;
    capabilities : Text;
  };

  type ContactInquiry = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    company : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type OldActor = {
    productsMap : Map.Map<Text, Product>;
    industriesMap : Map.Map<Text, Industry>;
    inquiriesMap : Map.Map<Text, ContactInquiry>;
    companyInfo : ?CompanyInfo;
  };

  type NewActor = {
    productsMap : Map.Map<Text, Product>;
    industriesMap : Map.Map<Text, Industry>;
    inquiriesMap : Map.Map<Text, ContactInquiry>;
    companyInfo : CompanyInfo;
  };

  public func run(old : OldActor) : NewActor {
    let companyInfo : CompanyInfo = {
      name = "MiM Structura";
      phone = "+91 8879802001";
      address = "Pupri, Sitamarhi, Bihar, 843314, India";
      email = "mimstructura@gmail.com";
      businessHours = "Mon-Fri 09:00-18:00";
      missionStatement = "To deliver high-quality engineering solutions that empower industries to achieve peak performance and innovation.";
      history = "Founded in 2007, MiM Structura has grown from a small startup to a leading provider of engineering solutions. With a commitment to innovation and customer satisfaction, we have consistently expanded our capabilities and market reach.";
      capabilities = "- Design and manufacturing of industrial machinery\n- Custom engineering solutions\n- Project management and consulting\n- Maintenance and support services";
    };
    {
      old with companyInfo;
    };
  };
};
