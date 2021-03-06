const App_Config = {
  app_bundle: {
    happ_hash: "QuarnnnnvltuenblergjasnvAfs",
  },
  domain_name: {
    dns_name: "zs.com"
  }
}

const Provider_Config = {
  provider_doc: {
    kyc_proof: "Document Credentials: Qmasfjw2938riuoh"
  }
}

const sleep=require('sleep')
module.exports = (scenario) => {
  scenario.runTape('register app', async(t, {liza}) => {
    let register_app_result = liza.call("provider", "register_app", App_Config);
    console.log("register_app_result", register_app_result);
    t.equal(register_app_result.Err.Internal, 'Agent Not a Provider');

    const register_provider_result = liza.call("provider", "register_as_provider", Provider_Config );
    console.log("App Address Hash: ", register_provider_result);
    t.equal(register_provider_result.Ok.length, 46);

    sleep.sleep(5);

    register_app_result = liza.call("provider", "register_app", App_Config);
    console.log("App Address Hash: ", register_app_result);
    t.equal(register_app_result.Ok.length, 46);

    sleep.sleep(5);


    const Host_Doc = {
      host_doc: {
        kyc_proof: "DOC # QuarnnnnvltuenblergjasnvAfs"
      }
    }

    const verified = liza.call("host", "register_as_host", Host_Doc);
    console.log("verified:: ",verified);
    t.equal(verified.Ok.length, 46)

    sleep.sleep(5);

    const all_apps_again = liza.call("host","get_all_apps",{});
    console.log("All Apps: ",all_apps_again);
    t.equal(all_apps_again.Ok.length, 1)
  })
}
