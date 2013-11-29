describe("The User Model", function() {
  var user;

  beforeEach(function() {
    localStorage.clear();

    user = new app.models.User({
      firstName: "Dan",
      lastName: "Garland",
      bio: "Freelance Ruby Guy from London",
      mission: "To understand Backbone.js"
    });

    someoneElse = new app.models.User({
      firstName: "Joe",
      lastName: "Bloggs",
      bio: "Test Object",
      mission: "To help test Backbone"
    });
    someoneElse.save();

    someoneElse.projects.create(new app.models.Project());
  });

  describe("with some projects", function() {
    beforeEach(function() {
      user.save();

      user.projects.create(new app.models.Project({
        title: "My Amazing Project"
      }));
    });

    it("should still have a project when we reload the user", function() {
      var newUser = new app.models.User({ id: user.id });
      console.log("new user");
      spyOn($, "ajax");
      newUser.fetch();
      var lastRequest = $.ajax.mostRecentCall.args[0];
      expect(lastRequest["url"]).toEqual("/users");
      expect(lastRequest["type"]).toEqual("GET");
    });
  });












  it("should have a firstName", function() {
    expect(user.get("firstName")).toBe("Dan");
  });

  it("should have a lastName", function() {
    expect(user.get("lastName")).toBe("Garland");
  });

  it("should have a Name", function() {
    expect(user.getName()).toBe("Dan Garland");
  });

  it("should have cid", function() {
    expect(user.cid).not.toBeNull();
  });

  it("should not have an id", function() {
    expect(user.id).toBeUndefined();
  });

  describe("Persistance", function() {
    var lastRequest;

    beforeEach(function() {
      spyOn($, "ajax");
      user.save();
      lastRequest = $.ajax.mostRecentCall.args[0];
      expect(lastRequest.url).toEqual("/users");
      expect(lastRequest.type).toEqual("POST");
    });

    it("should now have an id", function() {
      expect(user.id).not.toBeNull();
    });

    it("should also be able to retreive it from the store", function() {
      var new_user = new app.models.User({ id: 1 });
      new_user.fetch();
      lastRequest = $.ajax.mostRecentCall.args[0];
      expect(lastRequest.url).toEqual("/users/1");
      expect(lastRequest.type).toEqual("GET");
    });

  });

  describe("fullName", function() {
    var user;
    beforeEach(function() {
      user = new app.models.User();
    });

    describe("firstName only", function() {
      beforeEach(function() {
        user.set("firstName", "Dan");
      });

      it("should set only the firstName", function() {
        expect(user.get("fullName")).toBe("Dan");
      });
    });

    describe("lastName only", function() {
      beforeEach(function() {
        user.set("lastName", "Garland");
      });

      it("should set only the lastName", function() {
        expect(user.get("fullName")).toBe("Garland");
      });
    });

    describe("both firstName and lastName", function() {
      beforeEach(function() {
        user.set("firstName", "Dan");
        user.set("lastName", "Garland");
      });

      it("should set only the firstName", function() {
        expect(user.get("fullName")).toBe("Dan Garland");
      });
    });
  });

  describe("validation", function() {
    it("should be invalid without firstName", function() {
      user.set("firstName", undefined);
      expect(user.isValid()).toBeFalsy();
      expect(user.validationError.message).toEqual("First Name must be defined.");
    });

    it("should be invalid without lastName", function() {
      user.set("lastName", undefined);
      expect(user.isValid()).toBeFalsy();
      expect(user.validationError.message).toEqual("Last Name must be defined.");
    });

    it("should be invalid without Bio", function() {
      user.set("bio", undefined);
      expect(user.isValid()).toBeFalsy();
      expect(user.validationError.message).toEqual("Bio must be defined.");
    });

    it("should be invalid without Mission", function() {
      user.set("mission", undefined);
      expect(user.isValid()).toBeFalsy();
      expect(user.validationError.message).toEqual("Mission must be defined.");
    });
  });
});