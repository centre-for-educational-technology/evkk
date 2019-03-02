package ee.tlu.evkk.dal.dao;

import ee.tlu.evkk.dal.AbstractDalTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public class UserAccountDaoTest extends AbstractDalTest {

    @Autowired
    private UserAccountDao userAccountDao;

    @Test
    public void findById_GivenExistingId_ShouldReturnUserAccount() {

    }

}