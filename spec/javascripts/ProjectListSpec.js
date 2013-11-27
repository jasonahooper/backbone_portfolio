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
        projects.add({});
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

    it("should be able to merge changes in to the project list", function() {
      lastProject.set("title", "My Amazing Project");
      projects.add(lastProject, { merge : true });
      expect(projects.length).toBe(3);
      expect(projects.last().get("title")).toBe("My Amazing Project");
    });

    describe("removing projects", function() {
      beforeEach(function() {
        projects.remove(lastProject);
      });

      it("should have 2 projects", function() {
        expect(projects.length).toBe(2);
      });
    });

    describe("bulk update using set", function() {
      var someOtherProject;

      beforeEach(function() {
        // add this one
        someOtherProject = new app.models.Project({
          title: "Some Other Project"
        });

        // update this one
        lastProject.set("title", "My Amazing Project");

        // remove the others...
        var updates = [lastProject, someOtherProject ];
        projects.set(updates);
      });

      it("should take care of adding and removing items", function() {
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


    // describe("saving projects", function() {
    //   beforeEach(function() {
    //     projects.sync('create', projects); // note: not save()
    //   });

    //   it("should save each of the projects", function() {
    //     projects.forEach(function(project) {
    //       expect(project.id).not.toBeNull();
    //     });
    //   });

    //   it("should fetch from the backing store", function() {
    //     var newProjects = new app.collections.ProjectList();
    //     newProjects.fetch();
    //     expect(newProjects.length).toBe(3);
    //   });
    // });
  });
  describe("saving individual projects", function() {

    beforeEach(function() {
      var project = new app.models.Project({
        title: "My Amazing Project"
      });
      lastProject = projects.create(project); // add and sync together
    });

    it("should work", function() {
      expect(projects.length).toBe(1);
      expect(projects.first().id).not.toBeNull();
    });

    it("should fetch from backing store", function() {
      var someOtherList = new app.collections.ProjectList();
      someOtherList.fetch();
      expect(projects.first()).toBe(lastProject);
    });
  });

  describe("searching with where", function() {
    var myAmazingProject;

    beforeEach(function() {
      var project = new app.models.Project({
        title: "My Amazing Project"
      });
      myAmazingProject = projects.add(project);
    });

    it("should be found using where", function() {
      var results = projects.where({title : "My Amazing Project"});
      expect(results).toEqual([myAmazingProject]);
    });
  });
});