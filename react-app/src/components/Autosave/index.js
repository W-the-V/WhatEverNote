function Autosave({ experimentData }) {

    const debouncedSave = useCallback(
      debounce(async (newExperimentData) => {
        await saveExperimentDataToDb(newExperimentData);
      }, DEBOUNCE_SAVE_DELAY_MS),
      [],
    );
    
    // The magic useEffect hook. This runs only when `experimentData.name` changes.
    // We could add more properties, should we want to listen for their changes.
    useEffect(() => {
      if (experimentData) {
        debouncedSave(experimentData);
      }
      // debouncedSave is wrapped in a useCallback with an empty dependency list,
      // thus it will not change and in turn will not re-trigger this effect.
    }, [experimentData, debouncedSave]);
  
    // Do not display anything on the screen.
    return null;
  }