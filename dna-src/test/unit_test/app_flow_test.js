const sleep = require('sleep');

module.exports = (scenario) => {
  scenario.runTape('App Flow Test',async (t, {liza}) => {
    const App_Config_1 = {
      app_bundle: {
        happ_hash: "Quarnnnnvltuenb###CONFIG1"
      },
      domain_name: {
        dns_name: "apptest1.com"
      }
    }
    const App_Config_2 = {
      app_bundle: {
        happ_hash: "Quarnnnnvltuenb###CONFIG2"
      },
      domain_name: {
        dns_name: "apptest2.com"
      }
    }
    const Host_Doc = {
      host_doc:{
        kyc_proof: "DOC # QuarnnnnvltuenblergjasnvAfs"
      }
    }
    const verified = liza.call("host", "register_as_host", Host_Doc);
    console.log("verified:: ",verified);
    t.equal(verified.Ok.length, 46)
    const Provider_Doc = {
      provider_doc:{
        kyc_proof: "DOC # QuarnnnnvltuenblergjasnvAfs"
      }
    }
    const verified_provider = liza.call("provider", "register_as_provider", Provider_Doc);
    console.log("verified_provider:: ",verified_provider);
    t.equal(verified_provider.Ok.length, 46)

    sleep.sleep(5);

    const app_address_1 = liza.call("provider",  "register_app", App_Config_1);
    const app_address_2 = liza.call("provider",  "register_app", App_Config_2);
    console.log("APP ADDRESS 1:: ",app_address_1);
    t.equal(app_address_1.Ok, "QmQHz2S91HygBTqJmLjPCSTSyx5BYC3yidnyTrjVew8AxY");

    const app_enable = liza.call("host","enable_app",{app_hash:app_address_1.Ok});
    liza.call("host","enable_app",{app_hash:app_address_2.Ok});
    t.equal(app_enable.Ok, null)

    sleep.sleep(5);

    const app_list = liza.call("host","get_enabled_app_list",{});
    console.log("APP List:: ",app_list);
    t.equal(app_list.Ok.length, 2)

    sleep.sleep(5);

    const agent_list = liza.call("host","get_host_for_app",{app_hash:app_address_2.Ok});
    console.log("Agent List:: ",agent_list);
    t.equal(agent_list.Ok.length, 1)

    const disable_app_hash = liza.call("host","disable_app",{app_hash:app_address_2.Ok});
    t.equal(disable_app_hash.Ok, null)

    const app_list_after_disable = liza.call("host","get_enabled_app_list",{});
    console.log("APP list again:: ",app_list_after_disable);
    t.equal(app_list_after_disable.Ok.length, 1)

  })
}
