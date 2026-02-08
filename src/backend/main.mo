import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Time "mo:core/Time";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  public type ProductCategory = {
    #eotCranes;
    #billetShearingMachines;
    #scrapShredders;
  };

  public type Product = {
    id : Text;
    name : Text;
    category : ProductCategory;
    description : Text;
    specifications : Text;
    applications : Text;
    images : [Storage.ExternalBlob];
  };

  public type Industry = {
    id : Text;
    name : Text;
    description : Text;
  };

  public type CompanyInfo = {
    name : Text;
    address : Text;
    phone : Text;
    email : Text;
    businessHours : Text;
    missionStatement : Text;
    history : Text;
    capabilities : Text;
  };

  public type ContactInquiry = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    company : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactInquiry {
    public func compare(l : ContactInquiry, r : ContactInquiry) : Order.Order {
      Int.compare(r.timestamp, l.timestamp);
    };
  };

  // Persistent data stores
  let productsMap = Map.empty<Text, Product>();
  let industriesMap = Map.empty<Text, Industry>();
  let inquiriesMap = Map.empty<Text, ContactInquiry>();

  // Company info is now a record for infrequent updates, like address/phone changes, fully controlled by the backend.
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

  public query ({ caller }) func getProducts() : async [Product] {
    productsMap.values().toArray();
  };

  public query ({ caller }) func getProduct(id : Text) : async Product {
    switch (productsMap.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    productsMap.add(product.id, product);
  };

  public shared ({ caller }) func removeProduct(id : Text) : async () {
    if (not productsMap.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    productsMap.remove(id);
  };

  public query ({ caller }) func getIndustries() : async [Industry] {
    industriesMap.values().toArray();
  };

  public shared ({ caller }) func addIndustry(industry : Industry) : async () {
    industriesMap.add(industry.id, industry);
  };

  public query ({ caller }) func getCompanyInfo() : async CompanyInfo {
    companyInfo;
  };

  public shared ({ caller }) func submitContactInquiry(inquiry : ContactInquiry) : async () {
    inquiriesMap.add(inquiry.id, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [ContactInquiry] {
    inquiriesMap.values().toArray().sort();
  };
};
