describe("Project List", function() {
  var projects;

  beforeEach(function() {
    localStorage.clear();
    projects = new app.collections.ProjectList();
  });

  describe("adding projects", function() {
    var lastProject;

    beforeEach(function() {
      _(3).times(function(n) {
        projects.add(new app.models.Project({}));
      });

      lastProject = projects.last();
    });

    it("should add 3 projects", function() {
      expect(projects.length).toBe(3);
    });

    it("should ignore projects that are already there", function() {
      projects.add(lastProject);
      expect(projects.length).toBe(3);
    });

    it("should be able merge changes into the projectList", function() {
      lastProject.set("title", "My Amazing Project");
      projects.add(lastProject, { merge: true });
      expect(projects.length).toBe(3);
      expect(projects.last().get("title")).toBe("My Amazing Project");
    });

    describe("removing projects", function() {
      beforeEach(function() {
        projects.remove(lastProject);
      });

      it("should add 2 projects", function() {
        expect(projects.length).toBe(2);
      });
    });

    describe("bulk update using set", function() {
      var someOtherProject;

      beforeEach(function() {
        // Add this one
        someOtherProject = new app.models.Project({
          title: "Some Other Project"
        });

        // Update this one
        lastProject.set("title", "My Amazing Project")

        // Remove the others...
        var updates = [lastProject, someOtherProject];
        projects.set(updates);
      });

      it("should take care of adding/removing the items", function() {
        expect(projects.length).toBe(2);
        expect(projects.first()).toBe(lastProject);
        expect(projects.first().get("title")).toBe("My Amazing Project");
        expect(projects.last()).toBe(someOtherProject);
        expect(projects.last().get("title")).toBe("Some Other Project");
      });
    });

    it("should also retrieve by cid", function() {
      expect(projects.get(lastProject.cid)).toBe(lastProject);
    });

    describe ("saving projects", function() {
      beforeEach(function() {
        spyOn($, "ajax");
        projects.sync("create", projects); // not save()
        lastRequest = $.ajax.mostRecentCall.args[0];
        expect(lastRequest.url).toEqual("/projects");
        expect(lastRequest.type).toEqual("POST");
      });

      it("should save each of the projects", function() {
        projects.forEach(function(project) {
          expect(project.id).not.toBeNull();
        });
      });

      it("should fetch from the backing store", function() {
        var newProjects = new app.collections.ProjectList();
        newProjects.fetch();
        lastRequest = $.ajax.mostRecentCall.args[0];
        expect(lastRequest.url).toEqual("/projects");
        expect(lastRequest.type).toEqual("GET");
      });
    });
  });

  describe("saving individual projects", function() {
    var lastProject;

    beforeEach(function() {
      var project = new app.models.Project({
        title: "My Amazing Project"
      });
      lastProject = projects.create(project); // add + sync together
    });

    it("should bloody work", function() {
      expect(projects.length).toBe(1);
      expect(projects.first().id).not.toBeNull();
    });

    it("should fetch from backing store", function() {
      var someOtherList = new app.collections.ProjectList();
      spyOn($, "ajax");
      someOtherList.fetch();
      lastRequest = $.ajax.mostRecentCall.args[0];
      expect(lastRequest.url).toEqual("/projects");
      expect(lastRequest.type).toEqual("GET");
    });
  });

  describe("searching with where", function() {
    var myAmazingProject;

    beforeEach(function() {
      var project = new app.models.Project({
        title : "My Amazing Project"
      });
      myAmazingProject = projects.add(project);
    });

    it("should be found using where", function() {
      var results = projects.where({title : "My Amazing Project"});
      expect(results).toEqual([myAmazingProject]);
    });
  });
});